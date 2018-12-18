module BoardsHelper
  def board_user
    user = Board.find_by(id: params[:id]).user
    current_user == user ? true : false
  end

  def check_user
    user = User.find_by(id: params[:user_id])
    current_user == user ? true : false
  end
end
