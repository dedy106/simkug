window.app_saku3_transaksi_produk_fNota = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_produk_fNota.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_produk_fNota";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Nota", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,120,20],caption:"Tanggal", underline:true});	
		this.dp_d1 = new portalui_datePicker(this,{bound:[140,11,100,20],selectDate:[this,"doSelectDate"]});
		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Data Nota","Daftar Nota"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,
		            colTitle:["No. Nota","Deskripsi","Tanggal","Kode Tenan","Nilai","Status","No. Closing"],
					colWidth:[[6,5,4,3,2,1,0],[150,100,100,100,100,200,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Nota",click:[this,"doLoad"]});		
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"No Nota",maxLength:10,change:[this,"doChange"],readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,10,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});										
		this.cb_tenan = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,220,20],caption:"Tenan", maxLength:50, tag:1, multiSelection:false,change:[this,"doChange"]});
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,15,450,20],caption:"Deskripsi", maxLength:50, tag:1});
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"Nilai", maxLength:50, tag:1, tipeText:ttNilai,text:"0"});
		this.c_status = new saiCB(this.pc1.childPage[0],{bound:[20,13,200,20],caption:"Status",items:["TUNAI","TCASH"], readOnly:true,tag:2, change:[this,"doChange"]});	
		this.e_tcash = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"No TCASH", maxLength:50, tag:1});

		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);			
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan=1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_tenan.setSQL("select kode_tenan, nama from ktu_tenan where kode_lokasi='"+this.app._lokasi+"' ",["kode_tenan","nama"],false,["Kode","Nama"],"and","Data Tenan",false);
			
			this.c_status.items.clear();
			var data = this.dbLib.getDataProvider("select kode_bayar from ktu_jbayar",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_status.addItem(i,line.kode_bayar);
				}
			}
			this.c_status.setText("TUNAI");
					
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_produk_fNota.extend(window.childForm);
window.app_saku3_transaksi_produk_fNota.implement({
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
						sql.add("delete from ktu_nota where no_bukti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
					}	
					sql.add("insert into ktu_nota(no_bukti,tanggal,ket,kode_tenan,nilai,status,no_closing,nik_user,tgl_input,kode_lokasi,periode,no_ba,no_rekon,id_tcash,no_bukti_t, no_load,kode_pp) values "+
						    "	('"+this.cb_kode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_tenan.getText()+"','"+nilaiToFloat(this.e_nilai.getText())+"','"+this.c_status.getText()+"','-','"+this.app._userLog+"',getdate(),'"+this.app._lokasi+"','"+this.e_periode.getText()+"','-','-','"+this.e_tcash.getText()+"','-','NON','"+this.app._kodePP+"')");
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
					sql.add("delete from ktu_nota where no_bukti = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
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
				break;
			case "simpan" :	
			case "ubah" :
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																	
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Nilai nota tidak boleh 0 atau kurang.");
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
				this.cb_tenan.setText("","");
				this.e_ket.setText("");
				this.e_nilai.setText("0");
				this.c_status.setText("TUNAI");
			}
			this.cb_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"ktu_nota","no_bukti",this.app._lokasi+"-NT"+this.e_periode.getText().substr(2,4)+".","0000"));
			this.stsSimpan=1;	
			setTipeButton(tbSimpan);
			this.cb_tenan.setFocus();	
		}
	},
	doChange: function(sender){
		try{
			if(sender == this.c_status && this.c_status.getText() != ""){
				if(this.c_status.getText() == "TUNAI"){
					this.e_tcash.setReadOnly(true);
					this.e_tcash.setTag("9");
					this.e_tcash.setText("");
				}
				else{
					this.e_tcash.setReadOnly(false);
					this.e_tcash.setTag("1");
				}
			}
			if(sender == this.cb_tenan && this.cb_tenan.getText() != ""){
				var strSQL = "select nama,kode_kantin from ktu_tenan where kode_tenan ='"+this.cb_tenan.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.e_ket.setText("Pembelian "+line.nama);
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
				this.stsSimpan = 0;

				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.cb_kode.setText(this.sg1.cells(0,row));

				var strSQL = "select tanggal,ket,kode_tenan,nilai,status,no_closing,id_tcash from ktu_nota where no_bukti ='"+this.cb_kode.getText()+"' and kode_lokasi= '"+this.app._lokasi+"' ";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){						
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.ket);
						this.cb_tenan.setText(line.kode_tenan);	
						this.c_status.setText(line.status);
						this.e_nilai.setText(floatToNilai(line.nilai));
						this.e_tcash.setText(line.id_tcash);
					}
				}									
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
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
		var strSQL = "select no_bukti,tanggal,ket,kode_tenan,nilai,status,no_closing from ktu_nota where tanggal = '"+this.dp_d1.getDateString()+"' and no_closing = '-' and nik_user = '"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'";		
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
			this.sg1.appendData([line.no_bukti,line.ket,line.tanggal,line.kode_tenan,floatToNilai(line.nilai),line.status,line.no_closing]); 
		}
		this.sg1.setNoUrut(start);

	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	}
});
