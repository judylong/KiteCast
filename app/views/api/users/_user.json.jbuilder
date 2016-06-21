json.extract! user, :email, :id
json.past_queries user.location_queries, partial: 'api/location_queries/location_query', as: :query
