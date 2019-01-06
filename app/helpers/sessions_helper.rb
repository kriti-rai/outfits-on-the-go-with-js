module SessionsHelper
  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def logged_in?
    !!current_user
  end

  def require_login
    if !logged_in?
      flash[:error] = "Please log in"
      redirect_to signin_path
    end
  end

  def log_user_in
    session[:user_id] = @user.id
    flash[:success] = "Logged in succesfully"
    render 'static/home'
  end

end
