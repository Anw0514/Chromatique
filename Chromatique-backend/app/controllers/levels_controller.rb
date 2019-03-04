class LevelsController < ApplicationController
  before_action :get_level, only: %i(show)

  def index
    render json: Level.public_levels, status: 200
  end

  def show
    render json: @level, status: 200
  end

  private 

  def get_level
    @level = Level.find(params[:id])
  end
end
