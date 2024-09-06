require "test_helper"

class TasksControllerTest < ActionDispatch::IntegrationTest
  setup do
    @task = tasks(:one)
  end

  test "should get index" do
    get tasks_url, as: :json
    assert_response :success
  end

  test "should create task" do
    assert_difference("Task.count") do
      post tasks_url, params: { task: { daily_repeat: @task.daily_repeat, ending_time: @task.ending_time, name: @task.name, repeat_on_day: @task.repeat_on_day, starting_time: @task.starting_time } }, as: :json
    end

    assert_response :created
  end

  test "should show task" do
    get task_url(@task), as: :json
    assert_response :success
  end

  test "should update task" do
    patch task_url(@task), params: { task: { daily_repeat: @task.daily_repeat, ending_time: @task.ending_time, name: @task.name, repeat_on_day: @task.repeat_on_day, starting_time: @task.starting_time } }, as: :json
    assert_response :success
  end

  test "should destroy task" do
    assert_difference("Task.count", -1) do
      delete task_url(@task), as: :json
    end

    assert_response :no_content
  end
end
