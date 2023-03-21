class CreatePresets < ActiveRecord::Migration[7.0]
  def change
    create_table :presets do |t|
      t.string :name
      t.string :sequence
      t.integer :bpm
      t.string :kit

      t.timestamps
    end
  end
end
