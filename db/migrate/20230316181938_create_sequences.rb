class CreateSequences < ActiveRecord::Migration[7.0]
  def change
    create_table :sequences do |t|
      t.string :name
      t.string :sequence
      t.integer :bpm
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
