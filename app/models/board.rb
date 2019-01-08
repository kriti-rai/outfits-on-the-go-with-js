class Board < ApplicationRecord
  belongs_to :user
  has_many :outfits, dependent: :destroy
  scope :newest_to_oldest, -> {order("boards.created_at DESC")}

  def created_date
    self.created_at.strftime("%b %e, %l:%M %p")
  end

end
