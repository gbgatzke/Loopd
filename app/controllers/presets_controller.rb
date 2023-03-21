class PresetsController < ApplicationController

    wrap_parameters format: []

    def index
        presets = Preset.all
        render json: presets, status: :ok
    end
    def show
        preset = Preset.find(params[:id])
        render json: preset, status: :ok
    end

    def create
        preset = Preset.create!(sequence_params)
        render json: preset, status: :created
    end

    private

    def preset_params
        params.permit(:name, :bpm, :sequence)
    end
end
