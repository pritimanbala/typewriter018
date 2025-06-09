main = [[1,1,5,5],
        [8,5,2,6],
        [2 ,4,5,9],
        [3,2,1,4]]

b = [1, 2,3,4]
# gaussian elimation
l = len(main)
def sorter(i):
    for i in range(3):
        for j in range(i + 1, l):
            if main[i][i] >= 0:
                if main[i][i] < main[j][i]:
                    main[i], main[j] = main[j], main[i]
            else:
                if main[i][i] > main[j][i]:
                    main[i], main[j] = main[j], main[i]
            
def gauss_elm():
    for i in range(l):
        sorter(i)
        for j in range(i + 1, l):
            if main[j][i] != 0:
                factor = main[j][i] / main[i][i]
                for k in range(3):
                    main[j][k] = main[j][k] - factor * main[i][k]
    print(main)


gauss_elm()

soln = []
def subs():
    for i in range(l):
        soln.append(0)
    for k in range(l):
        sum = 0 
        for j in range(l):
            sum = soln[l] * main[l-k]
#do something with the sum that it does back substitution
