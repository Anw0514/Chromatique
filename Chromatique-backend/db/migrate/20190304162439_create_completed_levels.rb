class CreateCompletedLevels < ActiveRecord::Migration[5.2]
  def change
    create_table :completed_levels do |t|
      t.belongs_to :user, foreign_key: true
      t.belongs_to :level, foreign_key: true

      t.timestamps
    end
  end
end
