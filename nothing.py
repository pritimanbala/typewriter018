main = [["a11", "a12", "a13"],
        ["a21", "a22", "a23"],
        ["a31", "a32", "a33"]]

for i in range(3):
    for j in range(3):
        a = int(input("enter the value of", main[i][j]))
        main[i][j] = a

# gaussian elimation

def operation(i, a):
    for j in range(3):
        main[i][j] = main[i][j] * a

def gaussian_elm():
    for i in range(3):
        if i == 0:
            operation(i, 1 / main[i][i])
        else:
            operation(i, 1/main[i][0])
            main