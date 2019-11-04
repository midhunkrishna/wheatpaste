class CreateSelections < ActiveRecord::Migration[6.0]
  def change
    create_table :selections do |t|
      t.string :host
      t.string :url
      t.text :text

      t.timestamps
    end
  end
end
