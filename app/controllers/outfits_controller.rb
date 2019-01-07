class OutfitsController < ApplicationController
  before_action :require_login
  before_action :set_outfit, only: [:edit, :update, :index, :show, :destroy]
  skip_before_action :verify_authenticity_token, only: [:destroy, :update]
  helper_method :outfit_owner

  def new
    @outfit = Outfit.new(user: current_user, board: Board.find(params[:board_id]))
    @board = Board.find(params[:board_id])
    render layout: false
  end

  def create
    @outfit = Outfit.new(outfit_params)
    if @outfit.save
      render json: @outfit
    else
      flash[:error] = @outfit.errors.full_messages[0]
      render 'new'
    end
  end

  def edit
    if outfit_owner
      render layout: false
    else
      flash[:error] = "Permission denied"
      render json: @outfit
    end
  end

  def update
    if @outfit.update(outfit_params)
      flash[:success] = "Post updated successfully"
      render json: @outfit
    else
      render 'edit'
    end
  end

  def index
    @board = Board.find(params[:board_id])
    @outfits = @board.outfits
    render json: @outfits
  end

  def show
    render json: @outfit
  end

  def destroy
    if outfit_owner
      @outfit.destroy
      render json: @outfit.board
    else
      flash[:error] = "Permission denied"
      redirect_to @outfit
    end
  end

  private

    def outfit_params
      params.require(:outfit).permit(:caption, :user_id, :board_id, :image, :hashtags, :tag_ids=>[])
    end

    def set_outfit
      @outfit = Outfit.find_by(id: params[:id])
    end

    def outfit_owner
      set_outfit
      current_user == @outfit.user ? true : false
    end

end
