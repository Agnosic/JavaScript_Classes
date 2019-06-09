defmodule Factorial do
    def of(0) do 1 end
    def of(n \\ 5) do
        of(n-1) * n
    end
end