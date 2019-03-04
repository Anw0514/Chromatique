class User < ApplicationRecord
    has_secure_password
    has_many :levels, dependent: :destroy
    has_many :completed_levels, dependent: :destroy
end
