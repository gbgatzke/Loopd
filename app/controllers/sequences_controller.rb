class SequencesController < ApplicationController

    wrap_parameters format: []
    def show
        sequence = Sequence.find(params[:id])
        render json: sequence, status: :ok
    end

    def create
        sequence = Sequence.create!(sequence_params)
        render json: sequence, status: :created
    end

    private

    def sequence_params
        params.permit(:name, :bpm, :user_id, sequence: [])
    end
end
