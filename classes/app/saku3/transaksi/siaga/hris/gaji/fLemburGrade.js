window.app_saku3_transaksi_siaga_hris_gaji_fLemburGrade = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_gaji_fLemburGrade.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_gaji_fLemburGrade";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Hak Lembur per Grade", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		uses("saiGrid",true);	
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Param","Data Param"]});				
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:9,
		            colTitle:["Grade","Deskripsi","Pengali U Lembur","Pengali U Makan","Pengali U Transport"],
					colWidth:[[4,3,2,1,0],[110,110,110,300,80]], 
					colFormat:[[2,3,4],[cfNilai,cfNilai,cfNilai]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg,page:[this,"doPager"]});
		
		this.cb_kode = new saiCBBL(this.pc1.childPage[1],{bound:[20,12,220,20],caption:"Kode Grade", maxLength:10,multiSelection:false, tag:0,change:[this,"doChange"]});
		this.e_ulembur = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"U Lembur(x)", tag:0, tipeText:ttNilai, text:"0"});
		this.e_umakan = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"U Makan(x)", tag:0, tipeText:ttNilai, text:"0"});
		this.e_utrans = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,15,200,20],caption:"U Transport(x)", tag:0, tipeText:ttNilai, text:"0"});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doLoad();				

			this.cb_kode.setSQL("select kode_grade, nama from gr_grade where kode_lokasi='"+this.app._lokasi+"'",["kode_grade","nama"],false,["Kode","Nama"],"and","Data Grade",true);						
							
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_gaji_fLemburGrade.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_gaji_fLemburGrade.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_lembur_grade(kode_grade,u_lembur,u_makan,u_trans,kode_lokasi) values "+
							"('"+this.cb_kode.getText()+"',"+parseNilai(this.e_ulembur.getText())+","+parseNilai(this.e_umakan.getText())+","+parseNilai(this.e_utrans.getText())+",'"+this.app._lokasi+"')");							
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_lembur_grade where kode_grade='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					sql.add("insert into gr_lembur_grade(kode_grade,u_lembur,u_makan,u_trans,kode_lokasi) values "+
							"('"+this.cb_kode.getText()+"',"+parseNilai(this.e_ulembur.getText())+","+parseNilai(this.e_umakan.getText())+","+parseNilai(this.e_utrans.getText())+",'"+this.app._lokasi+"')");					
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
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_lembur_grade where kode_grade='"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0"),undefined);
					this.sg.clear(1);
				setTipeButton(tbUbahHapus);
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
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.u_lembur,a.u_makan,a.u_trans from gr_lembur_grade a "+
													 "where a.kode_grade ='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.e_ulembur.setText(floatToNilai(line.u_lembur));
						this.e_umakan.setText(floatToNilai(line.u_makan));
						this.e_utrans.setText(floatToNilai(line.u_trans));
						setTipeButton(tbUbahHapus);
					} 
				}else { 
					setTipeButton(tbSimpan);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg.cells(0,row));										
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){		
		var strSQL = "select a.kode_grade,a.nama,b.u_lembur,b.u_makan,b.u_trans "+
					 "from  gr_grade a inner join gr_lembur_grade b on a.kode_grade=b.kode_grade and a.kode_lokasi=b.kode_lokasi "+
					 "where a.kode_lokasi='"+this.app._lokasi+"'";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);	
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.kode_grade,line.nama,floatToNilai(line.u_lembur),floatToNilai(line.u_makan),floatToNilai(line.u_trans)]);
		}
		this.sg.setNoUrut(start);
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();											

						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Grade",sender,undefined, 
												  "select kode_grade,nama    from gr_grade where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_grade) from gr_grade where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_grade","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	}
});