class SequenceSerializer < ActiveModel::Serializer
  attributes :id, :name, :sequence, :bpm, :kit
end
