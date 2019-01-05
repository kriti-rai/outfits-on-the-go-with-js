class SessionsController < ApplicationController
  before_action :require_login
  skip_before_action :require_login, only: [:new, :create]
  skip_before_action :verify_authenticity_token, only: [:destroy]


  def new
    if logged_in?
      @user = current_user
      redirect_to feed_path
    else
      render 'new'
    end
  end

  def create
    if auth
      @user = User.find_or_create_by(auth)
      log_user_in
    else
      @user = User.find_by(username: params[:username])
      if @user && @user.authenticate(params[:password])
        log_user_in
      else
        flash[:error] = "The username and password combination does not match our records."
        redirect_to signin_path
      end
    end
  end

  def destroy
    session.delete :user_id
    redirect_to root_url
  end

  private
    def auth
      request.env['omniauth.auth']
    end

end
