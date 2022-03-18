window.app_saku3_transaksi_sapyakes_fTBload = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_sapyakes_fTBload.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_sapyakes_fTBload";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Transfer Data Trial Balance", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator");
		
		this.e_usersap = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],tag:2,readOnly:true,caption:"User SAP",text:""});
		this.e_pwdsap = new portalui_saiLabelEdit(this,{bound:[20,11,200,20],tag:2,readOnly:true,caption:"Password SAP",text:"",password:true});
		this.c_jenis = new saiCB(this,{bound:[20,12,250,20],caption:"Jenis",items:["1.TB AWAL THN","2.TB MUTASI","3.BUKUBESAR"], readOnly:true,tag:2});
			
		this.bHitung = new button(this,{bound:[120,13,100,18],caption:"Load Data",click:[this,"doLoad"]});			
		
		
		this.p1 = new panel(this,{bound:[20,23,900,400],caption:"Daftar Transaksi"});
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-50],colCount:6,tag:2,				
				colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","DC","Nilai"],
				colWidth:[[5,4,3,2,1,0],[100,50,220,100,220,100]],
				readOnly:true,	colFormat:[[5],[cfNilai]],					
				defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,this.p1.height-25,this.p1.width-1,25],buttonStyle:3,grid:this.sg});				
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			var data = this.dbLib.getDataProvider("select sap_user,sap_pwd from hakakses where nik='"+this.app._userLog+"'",true);			
			if (typeof data == "object"){
				var line = data.rs.rows[0];																						
				this.e_usersap.setText(line.sap_user);
				this.e_pwdsap.setText(line.sap_pwd);
			}
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_sapyakes_fTBload.extend(window.childForm);
window.app_saku3_transaksi_sapyakes_fTBload.implement({
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
					
					var strSQL = "select substring(convert(varchar,  dateadd(s,-1,dateadd(mm, datediff(m,0,'"+this.app._periode.substr(0,4)+"-"+this.app._periode.substr(4,2)+"-01')+1,0)) ,112),7,2) as tglakhir" ;
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){						
							var tglAkhir = parseInt(line.tglakhir);
						}
					}
			
					if (this.c_jenis.getText().substr(0,1) == "1") {
						this.nb = this.standarLib.noBuktiOtomatis(this.dbLib,"sap_tb_m","no_bukti","TBA"+this.app._periode.substr(2,4)+".","0000");
						sql.add("insert into sap_tb_d(no_bukti,kode_akun,kode_lokasi,periode,kode_pp,dc,nilai) "+
								"select '"+this.nb+"',a.kode_akun,a.kode_lokasi,a.periode,a.kode_pp,"+
								"case when a.debet<>0 then 'D' else 'C' end as dc,"+
								"a.debet+a.kredit as nilai "+
								"from exs_glma_pp a "+
								"inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
								"where a.periode = '201601' ");
						
						sql.add("insert into glsap(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,no_doksap) "+
								"select no_bukti,0,kode_lokasi,'TB','-','-','"+tglAkhir+"',kode_akun,dc,nilai,'-',kode_pp,periode,'-','IDR',1,nilai,getdate(),'"+this.app._userLog+"','-','-','-','-','-','-','-' "+
						    	"from sap_tb_d "+
								"where nilai <> 0 and kode_lokasi='"+this.app._lokasi+"' and no_bukti='"+this.nb+"'");
					}
					
					if (this.c_jenis.getText().substr(0,1) == "2") {
						this.nb = this.standarLib.noBuktiOtomatis(this.dbLib,"sap_tb_m","no_bukti","TBM"+this.app._periode.substr(2,4)+".","0000");
						/*
						selisihkan dengan yg sebelumnya
						
						sql.add("insert into sap_tb_d(no_bukti,kode_akun,kode_lokasi,periode,kode_pp,dc,nilai) "+
								"select '"+nb+"',a.kode_akun,a.kode_lokasi,a.periode,a.kode_pp,"+
								"case when a.debet<>0 then 'D' else 'C' end as dc,"+
								"a.debet+a.kredit as nilai "+
								"from exs_glma_pp a "+
								"inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
								"inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
								"where a.periode = '201601' ";
						*/
					}
					
					if (this.c_jenis.getText().substr(0,1) == "3") {
						this.nb = this.standarLib.noBuktiOtomatis(this.dbLib,"sap_tb_m","no_bukti","BBS"+this.app._periode.substr(2,4)+".","0000");
					
					}
					
					sql.add("insert into sap_tb_m (no_bukti,keterangan,tgl_input,nik_user) values "+
							"('"+this.nb+"','-',getdate(),'"+this.app._userLog+"')");
					
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
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_flag);
					this.sg.clear(1); 
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doLoad: function(sender){
		try{		
			var strSQL = "select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,"+
						 "case when a.debet<>0 then 'D' else 'C' end as dc,"+
						 "a.debet+a.kredit as nilai "+
						 "from exs_glma_pp a "+
						 "inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						 "inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						 "where a.periode = '201601' ";//'"+this.app._periode+"'";
						 
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.dc.toUpperCase(),floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);										
		}catch(e){
			systemAPI.alert(e);
		}
	},			
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi");							
							this.app._mainForm.bClear.click();
							
							this.app.services.postSAP(this.nb,"TB", function(data){ alert(data); });
							
						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});