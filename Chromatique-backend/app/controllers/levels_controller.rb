class LevelsController < ApplicationController
  before_action :get_level, only: %i(show complete)

  def index
    render json: Level.public_levels, status: 200
  end

  def show
    render json: @level, status: 200
  end

  def create
    Level.create!(level_params)
  end

  def destroy
    Level.destroy(params[:id])
  end

  def complete
    completed_level = CompletedLevel.find_or_create_by!(level_id: params[:id], user_id: params[:user_id])
    render json: completed_level, status: 200
  end

  private 

  def get_level
    @level = Level.find(params[:id])
  end

  def level_params
    params.require(:level).permit(:name, :top_right, :bottom_right, :bottom_left, :top_left, :grid_size, :published, :user_id, :user, :creator, :creator_id)
  end
end
