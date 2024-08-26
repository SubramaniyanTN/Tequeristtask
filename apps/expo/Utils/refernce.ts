//Backend Logic to change the order of the Data

// app.post('/tasks/update-order', async (req, res) => {
//   const { taskId, newOrder, columnId } = req.body;

//   try {
//     // Find the task being moved
//     const task = await Task.findById(taskId);

//     if (!task) return res.status(404).send('Task not found');

//     // Find all tasks in the same column
//     const tasks = await Task.find({ columnId }).sort('order');

//     // Remove the task being moved from the list
//     const filteredTasks = tasks.filter(t => t.id !== taskId);

//     // Insert the task at the new position
//     filteredTasks.splice(newOrder - 1, 0, task);

//     // Update the order of all tasks in the column
//     for (let i = 0; i < filteredTasks.length; i++) {
//       filteredTasks[i].order = i + 1;
//       await filteredTasks[i].save();
//     }

//     res.send('Order updated successfully');
//   } catch (error) {
//     res.status(500).send('Server error');
//   }
// });
