Rails.application.routes.draw do
  get 'reports/index'
  get 'reports/show'
  get 'reports/new'
  get 'reports/edit'
  get 'reports/create'
  get 'reports/update'
  get 'reports/destroy'
  mount LetterOpenerWeb::Engine, at: "/letter_opener" if Rails.env.development?
  devise_for :users
  root to: 'users#index'
  resources :users, only: %i(index show)
end
