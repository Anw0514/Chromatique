class UsersController < ApplicationController
  before_action :get_user, only: %i(show)

  def index
    if params[:level_id]
      level = Level.find(params[:level_id])
      users = level.users
    else
      users = User.all
    end
    render json: users, status: 200
  end

  def show
    render json: @user, status: 200
  end

  private 

  def user_params
    params.require(:user).permit(:id, :username, :email, :user_id)
  end

  def get_user
    @user = User.find(params[:id])
  end
end
