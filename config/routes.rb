Rails.application.routes.draw do
  root to: "site#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :show, :destroy]
    resources :weather, only: [:index]
  end

end
