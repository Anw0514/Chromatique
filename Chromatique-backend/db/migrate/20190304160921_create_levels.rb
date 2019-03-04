class CreateLevels < ActiveRecord::Migration[5.2]
  def change
    create_table :levels do |t|
      t.string :name
      t.integer :grid_size
      t.string :top_left
      t.string :top_right
      t.string :bottom_left
      t.string :bottom_right
      t.belongs_to :user, foreign_key: true
      t.boolean :published

      t.timestamps
    end
  end
end
