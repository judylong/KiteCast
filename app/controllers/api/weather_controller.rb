module Api
  class WeatherController < ApiController
    def index
      if params[:query][:latitude] && params[:query][:longitude]
        debugger
        @weather = Weather.new(params['query'])
        if current_user
          @query = LocationQuery.create(loc_query_params.merge(:user_id => current_user.id, :session_token => session[:session_token]))
        end
        @weather
      end
    end

    def loc_query_params
      params[:query].permit(:latitude, :longitude, :formatted_address)
    end
  end
end
