class UsersController < ApplicationController
  skip_before_action :authorize

  wrap_parameters format: []
  def index
    @users = User.all
  render json: @users
  end


  def show
    user = User.find_by(id: session[:user_id])
    render json: user, status: :ok
  end


  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def update
    user = User.find(params[:id])
    user.update!(name_params)
    render json: user, status: :ok
  end

  def update_password
    user = User.find(params[:id])
    user.update!(password_params)
    render json: user, status: :ok
  end

  def destroy
    user = User.find_by(id: session[:user_id])
    user.destroy
    session.delete :user_id
    head :no_content
  end

  private
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:name, :username, :password, :password_confirmation)
    end

    def name_params
      params.permit(:name, :username)
    end

    def password_params
      params.permit(:password, :password_confirmation)
    end
end
