[build-system]
requires = ["setuptools>=61.0"]
build-backend = "setuptools.backends._legacy:_Backend"

[project]
name = "chaos-sdk"
version = "0.1.0"
description = "ChaosCompute Python SDK — Solana wallet-signed AI inference with OpenAI compatibility"
readme = "README.md"
requires-python = ">=3.10"
license = {text = "MIT"}
authors = [{name = "ChaosCompute"}]
keywords = ["ai", "inference", "solana", "openai", "gateway"]

dependencies = [
    "base58",
    "pynacl",
]

[project.optional-dependencies]
dev = ["pytest", "pytest-asyncio"]
