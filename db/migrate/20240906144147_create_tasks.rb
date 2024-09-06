class CreateTasks < ActiveRecord::Migration[7.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.string :starting_time
      t.string :ending_time
      t.integer :repeat_on_day
      t.boolean :daily_repeat

      t.timestamps
    end
  end
end
