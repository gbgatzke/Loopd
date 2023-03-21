class PresetSerializer < ActiveModel::Serializer
  attributes :id, :name, :bpm, :sequence, :kit
end
