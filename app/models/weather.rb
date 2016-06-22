class Weather
  require 'forecast_io'

  attr_reader :cast, :currently, :next48hours_chart, :next7days_chart, :next48hours, :next7days

  def initialize(location_params)
    ForecastIO.api_key = ENV["ForecastIO_KEY"]
    # debugger
    cast = ForecastIO.forecast(location_params[:latitude], location_params[:longitude], {exclude: ['minutely,flags']})

    @currently = cast['currently']

    @next48hours_chart = Weather.chartify(cast['hourly']['data'], ["temperature", "humidity", "cloudCover", "windSpeed", "precipProbability", "time"], "hour")
    @next7days_chart = Weather.chartify(cast['daily']['data'], ["temperatureMin", "temperatureMax", "time"], "day")

    @next48hours = cast['hourly']
    @next7days = cast['daily']
  end

  def self.chartify(arr, properties, timeType)
    hash = Hash.new {|h,k| h[k] = []}

    arr.each do |obj|
      properties.each do |property|
        if property == "time"
          hash[property].push(Weather.change_time(obj[property], timeType))
        elsif property == "humidity" || property == "precipProbability" || property == "cloudCover"
          hash[property].push(Weather.percentify(obj[property]))
        else
          hash[property].push(obj[property])
        end
      end
    end
    hash
  end

  def self.change_time(unixtime, timeType)
    if timeType == "hour"
      Time.at(unixtime).strftime("%l%p").strip()
    elsif timeType == "day"
      Time.at(unixtime).strftime("%A").strip()
    else
      Time.at(unixtime)
    end
  end

  def self.percentify(dec)
    dec * 100
  end
end
