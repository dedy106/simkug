window.app_saku3_transaksi_sju16_fFiskal = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sju16_fFiskal.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sju16_fFiskal";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Seleksi Data", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		this.c_periode = new saiCB(this,{bound:[20,11,200,20],caption:"Periode",readOnly:true,tag:0,change:[this,"doChange"]});

		this.pc2 = new pageControl(this,{bound:[5,10,960,460], childPage:["Data Fiskal","List Fiskal"]});
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-33],colCount:3,tag:9,
					colTitle:["No Bukti","Periode","Kode Akun"],
					colWidth:[[2,1,0],[180,80,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Fiskal",click:[this,"doLoad3"]});		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Fiskal",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.cb_akun = new saiCBBL(this.pc2.childPage[0],{bound:[20,10,220,20],caption:"Kode Akun",maxLength:10,multiSelection:false,change:[this,"doChange"]});	
		this.bLoad = new button(this.pc2.childPage[0],{bound:[870,10,80,18],caption:"Load Data",click:[this,"doLoad"]});				
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[5,23,948,375],childPage:["Daftar Jurnal"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:8,tag: 0,
		            colTitle:["Status","Tanggal","No Bukti","Deskripsi","D/C","Nilai","PP","ID"],
					colWidth:[[7,6,5,4,3,2,1,0],[50,100,100,50,200,100,100,80]],
					buttonStyle:[[0],[bsAuto]],checkItem:true,
					picklist:[[0],[new portalui_arrayMap({items:["FISKAL","NON"]})]],
					colFormat:[[5],[cfNilai]],
					dblClick:[this,"doDoubleClick1"],
					defaultRow:1,
					change:[this,"doChangeCells"],
					columnReadOnly:[true,[0,1,2,3,4,5,6],[]],
					ellipsClick:[this,"doEllipsClick"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
			
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			
			this.cb_akun.setSQL("select kode_akun, nama from masakun where jenis='Beban' and kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun",true);			
			this.c_periode.items.clear();
			var data = this.dbLib.getDataProvider("select distinct periode from gldt where kode_lokasi='"+this.app._lokasi+"' order by periode desc ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_periode.addItem(i,line.periode);
				}
			}		
			this.c_periode.setText("");		
			this.dataJU = {rs:{rows:[]}};		
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sju16_fFiskal.extend(window.childForm);
window.app_saku3_transaksi_sju16_fFiskal.implement({
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
			if(this.stsSimpan == 1) this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sju_fiskal_m","no_fiskal",this.app._lokasi+"-FS"+this.c_periode.getText().substr(2,4)+".","0000"));			
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

					if(this.stsSimpan == 0){
						sql.add("delete from sju_fiskal_m where no_fiskal = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_fiskal_d where no_fiskal = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}

					sql.add("insert into sju_fiskal_m(no_fiskal,kode_lokasi,tgl_input,nik_user,periode,kode_akun) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"',getdate(),'"+this.app._userLog+"','"+this.c_periode.getText()+"','"+this.cb_akun.getText()+"')");					
		
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];
						if (line.status.toUpperCase() == "NON"){
							sql.add("insert into sju_fiskal_d(no_fiskal,no_bukti, kode_lokasi,  tanggal, deskripsi, dc,nilai, kode_pp,no_urut,kode_akun) values "+
										"	('"+this.e_nb.getText()+"','"+line.no_bukti+"','"+this.app._lokasi+"','"+line.tanggal+"','"+line.keterangan+"','"+line.dc+"',"+parseNilai(line.nilai)+",'"+line.kode_pp+"',"+line.nu+",'"+this.cb_akun.getText()+"')");
							
						}
					}		
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
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);
					this.sg.clear(1);
					this.dataJU.rs.rows = [];
				//setTipeButton(tbUbahHapus);
				break;
			case "simpan" :	
			case "ubah"	:
				var isAda = false;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					if (line.status.toUpperCase() == "NON"){
						isAda = true;
					}
				}
										
				if (!isAda){
					system.alert(this,"Transaksi tidak valid.","Tidak ada transaksi dengan status NON.");
					return false;
				} 
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();
				sql.add("delete from sju_fiskal_m where no_fiskal = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from sju_fiskal_d where no_fiskal = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
                   	
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);
				
				break;				
		}
	},
	doChange:function(sender){	
		
		if (sender == this.c_periode && this.c_periode.getText() != "" && this.stsSimpan == 1) {
			this.doClick(this.i_gen);
			this.dataJU.rs.rows = [];
		}
		if (sender == this.cb_akun ) {
			if (this.stsSimpan==1) this.sg.clear();
			// this.doLoad();
		}

	},
	doLoad: function(sender){
	if (this.cb_akun.getText() != "" && this.c_periode.getText() !=""){
			// var strSQL ="select 'FISKAL' as status, a.no_bukti, a.tanggal, a.keterangan, a.dc, "+
			// "a.nilai, a.kode_pp, a.nu, b.no_bukti "+
			// "from gldt a "+
			// "left join sju_fiskal_d b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi "+
			// "where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_akun='"+this.cb_akun.getText()+"' and a.periode ='"+this.c_periode.getText()+"' and b.no_bukti is NULL order by a.tanggal ";

			var strSQL ="select 'FISKAL' as status, a.no_bukti, a.tanggal, a.keterangan, a.dc, a.nilai, a.kode_pp, a.nu, b.no_bukti as nbukti "+
			"from gldt a "+
			"left join sju_fiskal_d b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi and a.kode_akun=b.kode_akun and a.nu=b.no_urut "+
			"where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_akun='"+this.cb_akun.getText()+"' and a.periode ='"+this.c_periode.getText()+"' and b.no_bukti is NULL "+
			"union "+
			"select 'NON' as status, a.no_bukti, a.tanggal, a.deskripsi as keterangan, a.dc, a.nilai, a.kode_pp, a.no_urut as nu, '-' as nbukti "+
			"from sju_fiskal_d a "+
			"where a.kode_lokasi='"+this.app._lokasi+"' and a.no_fiskal='"+this.e_nb.getText()+"' and a.kode_akun='"+this.cb_akun.getText()+"' "+
			"order by a.tanggal";

			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);						
			// this.pc1.setActivePage(this.pc1.childPage[1]);	
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen && this.c_periode.getText() != "") {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sju_fiskal_m","no_fiskal",this.app._lokasi+"-FS"+this.c_periode.getText().substr(2,4)+".","0000"));
			this.cb_akun.setFocus();
			this.sg.clear();
			setTipeButton(tbSimpan);
			this.stsSimpan=1;
		}
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doTampilData: function(page) {		
		this.sg.clear(); 
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.status.toUpperCase(),line.tanggal,line.no_bukti,line.keterangan,line.dc,floatToNilai(line.nilai),line.kode_pp,line.nu]);
		}
		this.sg.setNoUrut(start);		
	},	
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.dataJU.rs.rows[((this.page-1)*this.app._pageRow) + row].status = this.sg.cells(0,row);
			// alert(row);
		}
	},
	doDoubleClick1: function(sender, col , row) {
		if (this.sg.cells(0,row) == "FISKAL") this.sg.cells(0,row,"NON");
		else this.sg.cells(0,row,"FISKAL");

		// if (col == 0) {
		// 	if (this.dataJU.rs.rows[((this.page-1)*this.app._pageRow) + row].status == "FISKAL"){
		// 		this.dataJU.rs.rows[((this.page-1)*this.app._pageRow) + row].status = "NON";
		// 	}else{
		// 		this.dataJU.rs.rows[((this.page-1)*this.app._pageRow) + row].status = "FISKAL";
		// 	}
			
		// }
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
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doLoad3:function(sender){																				
		var strSQL = "select a.no_fiskal,a.periode,a.kode_akun "+
		             "from sju_fiskal_m a "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.periode ='"+this.c_periode.getText()+"' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_fiskal,line.periode,line.kode_akun]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);											
				this.pc1.setActivePage(this.pc1.childPage[0]);													
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;								
				this.e_nb.setText(this.sg3.cells(0,row));
				this.c_periode.setText(this.sg3.cells(1,row));	
				this.cb_akun.setText(this.sg3.cells(2,row));							
																
				var data = this.dbLib.getDataProvider("select 'NON' as status, a.no_bukti, a.tanggal, "+
						   "a.deskripsi as keterangan, a.dc, a.nilai, a.kode_pp, a.no_urut as nu "+
						   "from sju_fiskal_d a "+
						   "where a.no_fiskal = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.tanggal ",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];	
						this.dataJU = data;					
						this.sg.appendData([line.status.toUpperCase(),line.tanggal,line.no_bukti,line.keterangan,line.dc,floatToNilai(line.nilai),line.kode_pp,line.nu]);
					}
				} else this.sg.clear(1);

			}									
		} catch(e) {alert(e);}
	}
});