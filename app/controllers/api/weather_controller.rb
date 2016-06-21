module Api
  class WeatherController < ApiController
    def index
      if params[:query][:latitude] && params[:query][:longitude]
        @weather = Weather.new(params[:query])
      end
    end
  end
end
