window.app_saku3_transaksi_sla_fRateAcuan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sla_fRateAcuan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sla_fRateAcuan";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Acuan Rate", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		
		this.c_periode = new saiCB(this,{bound:[20,11,200,20],caption:"Periode", tag:1,change:[this,"doChange"]});		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["List Data","Entry Data"]});				
		this.bTambah = new button(this.pc1.childPage[0],{bound:[900,10,80,18],caption:"+ Tambah",click:[this,"doTambah"]});
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[0], { bound: [20, 10, 250, 20], caption: "Search", maxLength: 100, tag: 9, change: [this, "doCari"] });
		this.c_show = new saiCB(this.pc1.childPage[0], { bound: [280, 10, 50, 20], caption: "", labelWidth:0, items: ["10", "15", "25", "50", "100"], readOnly: true, tag: 9, change: [this, "doLoad"] });
		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-65],colCount:3,tag:9,
		            colTitle:["Kode","Tenor","Pilih"],
					colWidth:[[2,1,0],[70,200,200]],					
					colFormat:[[2],[cfButton]], readOnly:true, colAlign:[[2],[alCenter]],													 
					click: [this, "doSort"], dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_rate = new portalui_saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Jenis Rate",tag:2, multiSelection:false,change:[this,"doChange"]});
		this.e_tenor1 = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Dari Tenor",tipeText:ttNilai, text:"0"});		
		this.e_tenor2 = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[250,11,200,20],caption:"s/d Tenor (Tahun)",tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_rate = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Rate %",tipeText:ttNilai, text:"0",tag:1});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		this.pc1.childPage[1].rearrangeChild(10, 23);
					
		setTipeButton(tbAllFalse);
				
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.stsCol = [0, 0, 0, 0, 0];
			this.c_show.setText("25");
			this.timeout = null;

			this.c_periode.items.clear();				
			var data = this.dbLib.getDataProvider(
				"select distinct (year+ case when len(period) = 2 then period else '0'+period end)  as periode "+
				"from mysym_f19_lock_period order by (year+ case when len(period) = 2 then period else '0'+period end) desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_periode.addItem(i,line.periode);
				}
			}
			this.c_periode.setText("");				

			this.cb_rate.setSQL("select kode_rate,nama from sla_rate_jenis ",["kode_rate","nama"],false,["Kode","Nama"],"and","Data Jenis Rate",true);									
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sla_fRateAcuan.extend(window.childForm);
window.app_saku3_transaksi_sla_fRateAcuan.implement({
	doTambah: function() {		
		this.stsSimpan = 1;
		this.pc1.setActivePage(this.pc1.childPage[1]);	   
		this.cb_rate.setFocus();     																	
    },
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into sla_rate_acuan(kode_rate,tenor1,tenor2,rate_acuan,periode) values "+
							"('"+this.cb_rate.getText()+"',"+this.e_tenor1.getText()+","+this.e_tenor2.getText()+","+nilaiToFloat(this.e_rate.getText())+",'"+this.c_periode.getText()+"')");					
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	ubah: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from sla_rate_acuan where periode='"+this.c_periode.getText()+"' and kode_rate = '"+this.cb_rate.getText()+"' and tenor2="+this.e_tenor2.getText()+" ");
					sql.add("insert into sla_rate_acuan(kode_rate,tenor1,tenor2,rate_acuan,periode) values "+
							"('"+this.cb_rate.getText()+"',"+this.e_tenor1.getText()+","+this.e_tenor2.getText()+","+nilaiToFloat(this.e_rate.getText())+",'"+this.c_periode.getText()+"')");					
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from sla_rate_acuan where periode='"+this.c_periode.getText()+"' and kode_rate = '"+this.cb_rate.getText()+"' and tenor2="+this.e_tenor2.getText()+" ");
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_rate);
				setTipeButton(tbAllFalse);
				this.doLoad();
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (sender == this.c_periode && this.c_periode.getText()!="") {
				this.doLoad();	
			}
			if ((sender == this.cb_rate || this.e_tenor2 || this.c_periode) && this.cb_rate.getText() != "" && this.e_tenor2.getText() != "" && this.c_periode.getText() != ""){
				var strSQL = "select * from sla_rate_acuan where periode='"+this.c_periode.getText()+"' and kode_rate ='"+this.cb_rate.getText()+"' and tenor2="+this.e_tenor2.getText()+" ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_tenor1.setText(floatToNilai(line.tenor1));							
						this.e_rate.setText(floatToNilai(line.rate_acuan));							
						setTipeButton(tbUbahHapus);
					}
					else{
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_rate.setText(this.sg1.cells(0,row));
				this.e_tenor2.setText(this.sg1.cells(1,row));	
			}
		} catch(e) {alert(e);}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_rate.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doLoad:function(sender){						
		var strSQL = "select kode_rate,tenor2 "+
		             "from sla_rate_acuan where periode='"+this.c_periode.getText()+"' "+
					 "order by kode_rate,tenor2";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},		
	doTampilData: function(page) {
		var show = parseInt(this.c_show.getText());		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * show;
		var finish = (start + show > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+show);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.kode_rate,line.tenor2,"Pilih"]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doCari: function (sender) {
		try {

			var show = parseInt(this.c_show.getText());
			var column_array = ['kode_rate', 'tenor2'];

			var search = this.e_kode2.getText();
			var filter_string = " (";

			for (var i = 0; i < column_array.length; i++) {

				if (i == (column_array.length - 1)) {
					filter_string += column_array[i] + " like '%" + search + "%' )";
				} else {
					filter_string += column_array[i] + " like '%" + search + "%' or ";
				}
			}
			
			var strSQL = "select kode_rate, tenor2 from sla_rate_acuan " +
						 "where " + filter_string + "  ";
			
			var data = this.dbLib.getDataProvider(strSQL, true);
			if (typeof data == "object" && data.rs.rows[0] != undefined) {
				this.dataJU = data;
				this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length / show));
				this.sgn1.rearrange();
				this.doTampilData(1);
			} else this.sg1.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		catch (e) {
			alert(e);
		}
	},
	doSort: function (sender, col, row) {
		try {

			var show = parseInt(this.c_show.getText());
			if (col == 2) {
				this.doDoubleClick(sender, col, row);
			} else {
				if (this.stsCol[col] == 1) {
					this.stsCol[col] = 0;
					var ordertype = " asc ";
				} else {
					this.stsCol[col] = 1;
					var ordertype = " desc ";
				}

				var column_array = ['kode_rate', 'tenor2'];

				var search = this.e_kode2.getText();
				var filter_string = " (";

				for (var i = 0; i < column_array.length; i++) {

					if (i == (column_array.length - 1)) {
						filter_string += column_array[i] + " like '%" + search + "%' )";
					} else {
						filter_string += column_array[i] + " like '%" + search + "%' or ";
					}
				}

				var strSQL = "select kode_rate,tenor2 " +
					"from sla_rate_acuan " +
					"where " + filter_string + " " +
					" order by " + column_array[col] + " " + ordertype;

				var data = this.dbLib.getDataProvider(strSQL, true);
				if (typeof data == "object" && data.rs.rows[0] != undefined) {
					this.dataJU = data;
					this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length / show));
					this.sgn1.rearrange();
					this.doTampilData(1);
				} else this.sg1.clear(1);
			}
		} catch (e) {

			alert(e);
		}
	}
});
