window.app_saku3_transaksi_produk_fNotaLoad = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_produk_fNotaLoad.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_produk_fNotaLoad";
		this.itemsValue = new arrayList();
		this.maximize();		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Load Data Nota", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,120,20],caption:"Tanggal", underline:true});	
		this.dp_d1 = new portalui_datePicker(this,{bound:[140,11,100,20],selectDate:[this,"doSelectDate"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Load","Daftar Load"]});				
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:4,tag:9,
		            colTitle:["No. Load","Deskripsi","Tanggal","Nilai"],
					colWidth:[[3,2,1,0],[100,100,300,100]],
					readOnly:true, colFormat:[[3],[cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager"]});
		this.bLoad3= new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad"]});		
		
		this.e_nb = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"No Load",maxLength:10,change:[this,"doChange"],readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});										
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"Deskripsi", maxLength:50, tag:1});
		this.e_tunai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Total Tunai", maxLength:50, tag:1, tipeText:ttNilai,text:"0", readOnly:true});
		this.e_tcash = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,200,20],caption:"Total TCASH", maxLength:50, tag:1, tipeText:ttNilai,text:"0", readOnly:true});		
		this.e_total = new saiLabelEdit(this.pc1.childPage[0],{bound:[790,17,200,20],caption:"Total", maxLength:50, tag:1, tipeText:ttNilai,text:"0", readOnly:true});
		this.bValid = new button(this.pc1.childPage[0],{bound:[670,17,100,20],caption:"Validasi", click:[this,"doValidasi"]});

		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,295],colCount:5,
					colTitle:["Kode Tenan","Tunai","TCASH","ID TCASH","Validasi/Nota"],
					colWidth:[[4,3,2,1,0],[150,100,100,100,100]],
					colFormat:[[1,2],[cfNilai,cfNilai]],
					pasteEnable:true,autoPaging:true,rowPerPage:20,afterPaste:[this,"doAfterPaste"], 
					readOnly:true, defaultRow:1
					});							
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll, grid:this.sg1, pager:[this,"doPager1"]});		
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);			
		setTipeButton(tbAllFalse);
		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_produk_fNotaLoad.extend(window.childForm);
window.app_saku3_transaksi_produk_fNotaLoad.implement({
	doAfterPaste: function(sender,totalRow){
		try {				
			this.sgn1.setTotalPage(sender.getTotalPage());
			this.sgn1.rearrange();									
		} catch(e) {alert(e);}
	},
	doPager1: function(sender,page){
		this.sg1.doSelectPage(page);
	},	
	doValidasi: function() {	
		var nbNota = this.standarLib.noBuktiOtomatis(this.dbLib,"ktu_nota","no_bukti",this.app._lokasi+"-NT"+this.e_periode.getText().substr(2,4)+".","0000");
		var formatID = nbNota.substr(0,10);

		var strSQL = "select kode_tenan from ktu_tenan where kode_kantin='"+this.app._kodePP+"' and kode_lokasi='"+this.app._lokasi+"'";			
		var dataS = this.dbLib.getDataProvider(strSQL,true);
		if (typeof dataS == "object" && dataS.rs.rows[0] != undefined){
			this.dataTenan = dataS;
		}				
		this.inValid = false;
		var tunai=tcash = 0;
		for (var i=0; i < this.sg1.getRowCount();i++){
			this.sg1.cells(4,i,"INVALID");
			for (var j=0;j < this.dataTenan.rs.rows.length;j++){
				if (this.sg1.cells(0,i) == this.dataTenan.rs.rows[j].kode_tenan) {
					this.sg1.cells(4,i,"VALID");				
				}				
			}	
			if ((nilaiToFloat(this.sg1.cells(1,i)) != 0) && (nilaiToFloat(this.sg1.cells(2,i)) != 0)) {
				this.sg1.cells(4,i,"INV: TUN/TCSH ?");					
			}			
			if (this.sg1.cells(4,i) == "INVALID" || this.sg1.cells(4,i) == "INV: TUN/TCSH ?") this.inValid = true;	
			tunai += 	nilaiToFloat(this.sg1.cells(1,i));
			tcash += 	nilaiToFloat(this.sg1.cells(2,i));

			if (!this.inValid) {
				var idx = parseFloat(nbNota.substr(10,4)) + i;
				idx = idx.toString();
				if (idx.length == 1) var nu = "000"+idx;
				if (idx.length == 2) var nu = "00"+idx;
				if (idx.length == 3) var nu = "0"+idx;
				if (idx.length == 4) var nu = idx;

				var nota = formatID+nu;
				this.sg1.cells(4,i,nota);
			}	
		}
		this.e_tunai.setText(floatToNilai(tunai));
		this.e_tcash.setText(floatToNilai(tcash));		
		var tot = tunai + tcash;
		this.e_total.setText(floatToNilai(tot)); 

		if (this.inValid) {			
			system.alert(this,"Data tidak valid.","Terdapat data berstatus INVALID.");
			setTipeButton(tbAllFalse);						
		} 
		else setTipeButton(tbSimpan);
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
			if (this.stsSimpan == 1) this.doClick(this.i_gen);					
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					if(this.stsSimpan == 0){
						sql.add("delete from ktu_nota_load where no_load = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from ktu_nota where no_load = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_closing='-'");	
					}	
					
					sql.add("insert into ktu_nota_load(no_load,tanggal,ket,nik_user,tgl_input,kode_lokasi,periode,tunai,tcash,kode_pp) values "+
							"('"+this.e_nb.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._userLog+"',getdate(),'"+this.app._lokasi+"','"+this.e_periode.getText()+"',"+nilaiToFloat(this.e_tunai.getText())+","+nilaiToFloat(this.e_tcash.getText())+",'"+this.app._kodePP+"')");

					for (var i=0; i < this.sg1.getRowCount();i++){
						var nilai = nilaiToFloat(this.sg1.cells(1,i)) + nilaiToFloat(this.sg1.cells(2,i));
						if (nilaiToFloat(this.sg1.cells(1,i)) != 0) var sts = "TUNAI";
						else var sts = "TCASH";
						sql.add("insert into ktu_nota(no_bukti,tanggal,ket,kode_tenan,nilai,status,no_closing,nik_user,tgl_input,kode_lokasi,periode,no_ba,no_rekon,id_tcash,no_bukti_t, no_load) values "+
								"('"+this.sg1.cells(4,i)+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.sg1.cells(0,i)+"','"+nilai+"','"+sts+"','-','"+this.app._userLog+"',getdate(),'"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','-','"+this.sg1.cells(3,i)+"','-','"+this.e_nb.getText()+"')");					
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
					sql.add("delete from ktu_nota_load where no_load = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from ktu_nota where no_load = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_closing='-'");
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
				setTipeButton(tbSimpan);
				this.pc1.setActivePage(this.pc1.childPage[0]);
				this.stsSimpan=1;
				this.doClick(this.i_gen);
				this.sg1.clear(1);
				this.sg3.clear(1);
				this.bValid.show();
				break;
			case "simpan" :	
			case "ubah" :
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																	
				if (nilaiToFloat(this.e_total.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total tidak boleh 0 atau kurang.");
					return false;						
				}
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}			
		if (this.stsSimpan == 1) {
			this.doClick(this.i_gen);
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			if(this.stsSimpan==0){
				this.e_tunai.setText("0");
				this.e_tcash.setText("0");
				this.e_total.setText("0");
				this.bValid.show();
			}
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ktu_nota_load","no_load",this.app._lokasi+"-LD"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.e_ket.setFocus();
			this.stsSimpan=1;			
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;
				this.bValid.hide();

				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.e_nb.setText(this.sg3.cells(0,row));

				var strSQL = "select * from ktu_nota_load where no_load ='"+this.e_nb.getText()+"' and kode_lokasi= '"+this.app._lokasi+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.ket);
						this.e_tunai.setText(floatToNilai(line.tunai));
						this.e_tcash.setText(floatToNilai(line.tcash));

						var total = parseFloat(line.tunai) + parseFloat(line.tcash) ;
						this.e_total.setText(total);
					}
				}	

				var data = this.dbLib.getDataProvider("select kode_tenan,case when status='TUNAI' then nilai else 0 end as tunai, "+
													  "case when status='TCASH' then nilai else 0 end as tcash, id_tcash, no_bukti "+
													  "from ktu_nota where no_load='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and no_closing ='-' order by no_bukti",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.kode_tenan,floatToNilai(line.tunai),floatToNilai(line.tcash),line.id_tcash,line.no_bukti]);
					}
				} else this.sg1.clear(1);
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
		var strSQL = "select a.no_load,convert(varchar,a.tanggal,103) as tanggal,a.ket,a.tunai+a.tcash as nilai "+
					 "from ktu_nota_load a "+
					 "left join ( "+
					 "    select distinct no_load,kode_lokasi from ktu_nota where no_closing<>'-' and kode_lokasi='"+this.app._lokasi+"' "+
					 ") b on a.no_load=b.no_load and a.kode_lokasi=b.kode_lokasi "+
					 "where b.no_load is null and a.kode_pp ='"+this.app._kodePP+"' and a.nik_user = '"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"' ";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData(1);
		} else this.sg3.clear(1);			
	},
	doTampilData: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];		
			this.sg3.appendData([line.no_load,line.ket,line.tanggal,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);

	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
