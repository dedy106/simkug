window.app_saku3_transaksi_yakes_inves_fGlobalIndex = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yakes_inves_fGlobalIndex.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yakes_inves_fGlobalIndex";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Index", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["List Data","Entry Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
		            colTitle:["Kode","Periode","Pilih"],
					colWidth:[[2,1,0],[70,300,100]],
					readOnly:true,
					colFormat:[[2],[cfButton]],
					click:[this,"doSgBtnClick"], colAlign:[[2],[alCenter]],													 
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_periode = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Periode",tag:2,readOnly:true,visible:true});
		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"No Bukti",maxLength:30,readOnly:true,change:[this,"doChange"]});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[225,13,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		
		this.p1 = new panel(this.pc1.childPage[1],{bound:[1,23,996,348],caption:"Detail"});
		// this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:7,tag:0,
		// 		colTitle:["Jenis Index","Nama","Negara","Nilai","Status","Indeks","IDBBerg"],
		// 		colWidth:[[6,5,4,3,2,1,0],[100,80,100,100,180,120,80]],
		// 		columnReadOnly:[true,[0],[1,2,3]],				
		// 		colFormat:[[3,5],[cfNilai,cfNilai]],
		// 		picklist:[[0,3],[new portalui_arrayMap({items:["GLOBAL","BOND"]}),new portalui_arrayMap({items:["AKTIF","NON"]})]],
		// 		dblClick:[this,"doDoubleClick"],nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],buttonStyle:[[0],[bsAuto]],defaultRow:1,autoAppend:false});
		// this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});				
		
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-50],colCount:5,tag:0,
				colTitle:["Jenis Index","IDIndex","Nama Indeks","Negara","Urutan"],
				colWidth:[[4,3,2,1,0],[80,120,250,100,100]],
				columnReadOnly:[true,[0,2,3],[1,4]],				
				colFormat:[[4],[cfNilai]],
				buttonStyle:[[0,1],[bsAuto,bsEllips]], 
				picklist:[[0],[new portalui_arrayMap({items:["GLOBAL","BOND"]})]],
				change:[this,"doChangeCell"],ellipsClick:[this,"doEllipsClick"],defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});				
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);			
		setTipeButton(tbSimpan);
				
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.doLoad();	
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yakes_inves_fGlobalIndex.extend(window.childForm);
window.app_saku3_transaksi_yakes_inves_fGlobalIndex.implement({
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 1){
					this.standarLib.showListData(this, "Daftar Indeks",sender,undefined, 
												  "select kode_bmark,nama    from inv_idbmark where kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_bmark)  from inv_idbmark where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_bmark","nama"],"and",["Kode","Nama"],false);				
				}		
			}				
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doChangeCell: function(sender, col, row){
		sender.onChange.set(undefined,undefined);	   
		if (col == 1) {
			if (this.sg.cells(1,row) != "") {				
				var data = this.dbLib.getDataProvider("select nama,negara from inv_idbmark where kode_bmark='"+this.sg.cells(1,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) {
						this.sg.cells(2,row,line.nama);
						this.sg.cells(3,row,line.negara);
					}
					else {						
						this.sg.cells(1,row,"");
						this.sg.cells(2,row,"");						
						this.sg.cells(3,row,"");						
					}
				}
			}
		}			
		sender.onChange.set(this,"doChangeCell");		
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
					sql.add("insert into inv_index_m(id,tgl_input,kode_lokasi,periode) values "+
					"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"')");	
					
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i)) {														
							sql.add("insert into inv_index_d(id,periode,kode_lokasi,jenis_index,negara,nama,nilai,nu,kode_bmark) values "+
							 		"('"+this.e_nb.getText()+"','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i)+"',0,"+nilaiToFloat(this.sg.cells(4,i))+",'"+this.sg.cells(1,i)+"')");							
						}
					}	
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
					sql.add("delete from inv_index_m where id = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_index_d where id = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");

					sql.add("insert into inv_index_m(id,tgl_input,kode_lokasi,periode) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"')");	
					
					for (var i = 0; i < this.sg.rows.getLength();i++){
						if (this.sg.rowValid(i)) {														
							sql.add("insert into inv_index_d(id,periode,kode_lokasi,jenis_index,negara,nama,nilai,nu,kode_bmark) values "+
										"('"+this.e_nb.getText()+"','"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i)+"',0,"+nilaiToFloat(this.sg.cells(4,i))+",'"+this.sg.cells(1,i)+"')");							
						}
					}	
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
					sql.add("delete from inv_index_m where id = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from inv_index_d where id = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");								
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
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		if(this.stsSimpan==1) this.doClick();
	},	
	doClick:function(sender){
		if(this.stsSimpan==0) 
		{
			this.sg.clear(1);
		}else{

			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"inv_index_m","id",this.app._lokasi+"-IDX"+this.e_periode.getText().substr(2,4)+".","000"));
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
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
			if (sender == this.e_nb && this.e_nb.getText() != ""){
				var strSQL = "select *,convert(varchar(10),tgl_input,121) as tgl from inv_index_m where id ='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";	
								  
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.dp_d1.setText(line.tgl);		
						this.e_periode.setText(line.periode);		

						var strSQL2 = "select * from inv_index_d where id ='"+line.id+"' and kode_lokasi='"+line.kode_lokasi+"' order by nu ";					   
						var data2 = this.dbLib.getDataProvider(strSQL2,true);
						if (typeof data2 == "object"){
							this.sg.clear();						
							if (data2.rs.rows[0] != undefined){
								for(var i=0;i<data2.rs.rows.length;i++){
									var line2 = data2.rs.rows[i];	
									this.sg.appendData([line2.jenis_index,line2.kode_bmark,line2.nama,line2.negara,floatToNilai(line2.nu)]); 
								}
							}
						}				
						this.stsSimpan = 0;
						setTipeButton(tbUbahHapus);
					}
					else{
						
						this.stsSimpan = 1;
						this.standarLib.clearByTag(this, new Array("1"),undefined);
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doSgBtnClick: function(sender, col, row){
		try{
			if (col == 2) {
				this.stsSimpan = 0;
				this.doDoubleClick(this.sg1,0,row); 				
			}
		}catch(e){
			alert(e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);
				this.e_nb.setText(this.sg1.cells(0,row));
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
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
		var strSQL = "select id,periode from inv_index_m order by id desc";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},		
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.id,line.periode,"Pilih"]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
