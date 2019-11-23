<%@ page import="model.Point" %>
<%@ page import="java.util.Collections" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>

<%@ page contentType="text/html;charset=UTF-8" %>
<jsp:useBean id="history" type="beans.History" scope="session"/>
<html>
<head>
    <meta charset="UTF-8">
    <title>Вторая лаба</title>
    <link rel="stylesheet" href="${pageContext.request.contextPath}/styles/main.css">
    <style>

    </style>
</head>
<body>
<div class="header">
    <div>
        <p>Сторожева Дарья</p>
        <p>P3214</p>
        <p>Варинт 216001</p>
    </div>
</div>

<div class="main">
    <table width="100%">
        <tr>
            <th colspan="2"> <h1>Попадение точки в область</h1></th>
        </tr>
        <tr>
            <td width="50%">
                <table width="100%">
                    <form id="inputForm" action="" method="get">
                        <p class="warn-checkbox" hidden>нет радиуса</p>


                        <h2>X:</h2>
                        <div class="button-div">
                            <input type="hidden" name="X">
                            <button type="button" class="button in-button x-button" id="b1" value="-3">-3</button>
                            <button type="button" class="button in-button x-button" id="b2" value="-2">-2</button>
                            <button type="button" class="button in-button x-button" id="b3" value="-1">-1</button>
                            <button type="button" class="button in-button x-button" id="b4" value="0">0</button>
                            <button type="button" class="button in-button x-button" id="b5" value="1">1</button>
                            <button type="button" class="button in-button x-button" id="b6" value="2">2</button>
                            <button type="button" class="button in-button x-button" id="b7" value="3">3</button>
                            <button type="button" class="button in-button x-button" id="b8" value="4">4</button>
                            <button type="button" class="button in-button x-button" id="b9" value="5">5</button>
                        </div>

                        <p class="warn-checkbox" hidden>Неверный X.</p>


                        <h2>Y:</h2>
                        <label>
                            <input name="Y" placeholder="(-3 to 3)" size="20px" type="text">
                        </label>

                        <p class="warn-checkbox" hidden>Не является числом</p>
                        <p class="warn-checkbox" hidden>Число от  -3 до 3.</p>
                        <p class="warn-checkbox" hidden>Сократите до 15 значимых цифр.</p>
                        <p class="warn-checkbox" hidden>Введите число.</p>

                            <h2>R:</h2>
                            <div class="button-div">
                                <input type="hidden" name="R">
                                <label> <input type="checkbox"  class="checkbox" value="1"  onclick="drawArea(1)">1</label>
                                <label><input type="checkbox"  class="checkbox" value="2"  onclick="drawArea(2)">2</label>
                                <label><input type="checkbox"  class="checkbox" value="3"  onclick="drawArea(3)">3</label>
                                <label><input type="checkbox"  class="checkbox" value="4"  onclick="drawArea(4)">4</label>
                                <label><input type="checkbox"  class="checkbox" value="5"  onclick="drawArea(5)">5</label>

                            </div>

                            <p class="warn-checkbox" hidden>Проблема с R.</p>



                        <br>
                        <input type="hidden" name="offset">
                        <button type="submit" class="button submit-button" id="submit">Проверить</button>
                        <button type="button" class="button submit-button">Очистить</button>

                    </form>
                   <%-- <form id="myForm" action="" method="get">

                    </form>
--%>
                </table>
            </td>
            <td>
                <canvas height="320px" width="320px" style="margin: 15px"></canvas>
            </td>

        </tr>
    </table>







    <%if (history.getList().size()>0){%>
    <h1>История нажатий</h1><button type="button" onclick="clearHistory(); location.reload()" id="history-button" class="button history-button">Очистить историю нажатий</button><br>
    <table id="result-table">
        <tr id="table-headers"><th>x</th><th>y</th><th>R</th><th>Цель</th><th>Время</th></tr>
        <%
            List<Point> list = new ArrayList<Point>(history.getList());
            Collections.reverse(list);
            for (Point p : list){%>
        <tr><td><%=p.getX()%></td><td><%=p.getY()%></td><td><%=p.getR()%></td><td><%=p.isInArea()%></td><td><%=p.getTime()%></td></tr>
        <%}%>
    </table>
    <%}%>
</div>
<script src="${pageContext.request.contextPath}/scripts/jdraw.js"></script>
<script src="${pageContext.request.contextPath}/scripts/main.js"></script>
<script src="${pageContext.request.contextPath}/scripts/ajax.js"></script>
</body>
</html>
