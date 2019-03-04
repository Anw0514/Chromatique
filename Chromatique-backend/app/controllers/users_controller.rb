class UsersController < ApplicationController
  before_action :get_user, only: %i(show)

  def show
    render json: @user, status: 200
  end

  private 

  def get_user
    @user = User.find(params[:id])
  end
end
