class SequenceSerializer < ActiveModel::Serializer
  attributes :id, :name, :sequence, :bpm
  has_one :user
end
