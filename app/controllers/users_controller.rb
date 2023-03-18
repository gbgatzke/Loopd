class UsersController < ApplicationController
  skip_before_action :authorize

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

  def update_names(name_params)
    user = User.find_by(id: session[:user_id])
    user.update(name_params)
    render json: user, status: :ok
  end

  def update_password(password_params)
    user = User.find_by(id: session[:user_id])
    user.update(password_params)
    render json: user, status: :ok
  end

  def destroy
    user = User.find_by(id: session[:user_id])
    user.destroy
    head :no_content
  end

  def destroy
    @user.destroy
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
