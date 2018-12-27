class OutfitsController < ApplicationController
  before_action :require_login
  before_action :set_outfit, only: [:edit, :update, :index, :show, :destroy]
  helper_method :outfit_owner

  def new
    @outfit = Outfit.new(user: current_user, board: Board.find(params[:board_id]))
  end

  def create
    @outfit = Outfit.new(outfit_params)
    if @outfit.save
      redirect_to @outfit
    else
      flash[:error] = @outfit.errors.full_messages[0]
      render 'new'
    end
  end

  def edit
    if outfit_owner
      render 'edit'
    else
      flash[:error] = "Permission denied"
      redirect_to @outfit
    end
  end

  def update
    if @outfit.update(outfit_params)
      flash[:success] = "Post updated successfully"
      redirect_to @outfit
    else
      render 'edit'
    end
  end

  def index
    @board = Board.find(params[:board_id])
    @outfits = @board.outfits
    # respond_to do |format|
    #   format.html { render :index }
    #   format.json { render json: @users }
    # end

    render json: @outfits
  end

  def show
    render json: @outfit
    # respond_to do |format|
    #   format.html { render :show }
    #   format.json { render json: @outfit}
    # end
  end

  def destroy
    if outfit_owner
      @outfit.destroy
      redirect_to @outfit.board
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
