class UsersController < ApplicationController
  before_action :require_login
  skip_before_action :require_login, only: [:new, :create]
  skip_before_action :verify_authenticity_token, only: [:destroy, :update]
  before_action :set_user, only: [:edit, :update, :show, :next, :destroy]

  def new
    @user = User.new
  end

  def create
    if auth
      @user = User.find_or_create_by(auth)
      log_user_in
    else
      @user = User.new(user_params)
      if @user.save
        log_user_in
      else
        flash[:error] = @user.errors.full_messages[0]
        render 'new'
      end
    end
  end

  def edit
    if @user == current_user
      render layout: false
    else
      flash[:error] = "Access denied"
      redirect_to @user
    end
  end

  def update
    if @user.update(user_params)
      render json: @user
    end
  end

  def show
    render json: @user
  end

  def index
    @users = User.sorted
    render json: @users
  end

  def next
    @next = @user.next
    render json: @next
  end

  def destroy
    if @user == current_user
      @user.destroy
      flash[:error] = "Account successfully deleted"
      redirect_to root_url
    else
      flash[:error] = "Access denied"
      redirect_to root_url
    end
  end

  private

    def user_params
      params.require(:user).permit(:username, :email_address, :password, :bio, :image)
    end

    def set_user
      @user = User.find_by(id: params[:id])
    end

    def auth
      request.env['omniauth.auth']
    end

end
