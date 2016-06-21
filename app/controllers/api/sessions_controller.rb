module Api
  class SessionsController < ApiController
    def show
      if current_user
        render :show
      else
        render json: {}
      end
    end

    def create
      user = User.find_by_credentials(
                      params[:user][:email],
                      params[:user][:password])
      if user.nil?
        head :unprocessable_entity
      else
        log_in(user)
        render :show
      end
    end

    def destroy
      log_out!
      render json: {}
    end
  end
end
