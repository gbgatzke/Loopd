class User < ApplicationRecord
    has_secure_password
    has_many :sequences, dependent: :destroy

    validates :name, presence: true
    validates :username, presence: true
end
