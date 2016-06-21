class LocationQuery < ActiveRecord::Base
  validates :latitude, :longitude, :formatted_address, :session_token, :user_id, presence: true
  belongs_to :user
end
