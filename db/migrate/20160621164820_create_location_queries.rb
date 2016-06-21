class CreateLocationQueries < ActiveRecord::Migration
  def change
    create_table :location_queries do |t|
      t.string :session_token, null: false
      t.integer :user_id, null: false
      t.text :formatted_address, null: false
      t.decimal :latitude, null: false
      t.decimal :longitude, null: false

      t.timestamps null: false
    end
  end
end
