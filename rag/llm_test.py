from groq import Groq  # Connects Python to Groq
import os              # Used to read our API key


# Get the Groq API key from the computer environment
api_key = os.getenv("GROQ_API_KEY")


# Check whether the API key is available
if not api_key:
    print("ERROR: GROQ_API_KEY is not set.")
    exit()


# Create the Groq client
client = Groq(api_key=api_key)


# Simple question to test the LLM
question = "What should I do if someone is following me?"


# Send the question to the LLM
response = client.chat.completions.create(
    model="openai/gpt-oss-20b",

    messages=[
        {
            "role": "user",
            "content": question
        }
    ],

    temperature=0.3
)


# Display the result
print("\nUser:")
print(question)

print("\nLLM Response:")
print(response.choices[0].message.content)