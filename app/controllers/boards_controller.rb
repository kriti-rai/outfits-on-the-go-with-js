class BoardsController < ApplicationController
  before_action :require_login
  before_action :set_board, only: [:edit, :update, :show, :destroy]
  skip_before_action :verify_authenticity_token, only: [:destroy, :update]
  include BoardsHelper

  def new
    @board = Board.new
    render layout: false
  end

  def create
    if params[:board][:name].blank?
      @board = Board.create(name: "Untitled", user_id: params[:board][:user_id])
    else
      @board = Board.create(board_params)
    end
    render json: @board
  end

  def edit
    if board_user
      render 'edit'
    else
      flash[:error] = "Permission denied"
      redirect_to @board
    end
  end

  def update
    if @board.update(board_params)
      flash[:success] = "Successfully updated the board"
      redirect_to @board
    else
      render 'edit'
    end
  end

  def feed
    @boards = Board.newest_to_oldest
    respond_to do |format|
      format.html { render :feed }
      format.json { render json: @boards }
    end
  end

  def show
    @user = @board.user
    @outfit = Outfit.new
    render json: @board
  end

  def index
    @user = User.find_by(id: params[:user_id])
    if !@user.nil?
      @boards = @user.boards
      render json: @boards
    else
      flash[:error] = "The user does not exist"
      redirect_to feed_path
    end
  end

  def destroy
    @board.destroy
    render json: @board.user
  end

  private
    def board_params
      params.require(:board).permit(:name, :user_id)
    end

    def set_board
      @board = Board.find_by(id: params[:id])
    end

end
