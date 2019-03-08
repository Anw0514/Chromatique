class User < ApplicationRecord
    has_secure_password
    has_many :levels, dependent: :destroy
    has_many :completed_levels, dependent: :destroy

    def completed_level(level)
        CompletedLevel.find_by(user_id: self.id, level_id: level.id)
    end
end
