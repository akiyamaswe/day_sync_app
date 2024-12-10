class CreateMentions < ActiveRecord::Migration[7.1]
  def change
    create_table :mentions do |t|
      t.belongs_to :mentioning_report, null: false, foreign_key: { to_table: :reports }, index: false
      t.belongs_to :mentioned_report, null: false, foreign_key: { to_table: :reports }, index: false
      t.index %i[ mentioning_report_id mentioned_report_id ], unique: true
      t.timestamps
    end
  end
end
