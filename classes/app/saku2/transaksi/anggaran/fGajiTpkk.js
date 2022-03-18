/*
10.01 --> kordinator tpkk
11.02 --> plks asmandalmed
*/
window.app_saku2_transaksi_anggaran_fGajiTpkk = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_anggaran_fGajiTpkk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_anggaran_fGajiTpkk";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Gaji Dokter TPKK: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,maxLength:4,tipeText:ttAngka,change:[this,"doChange"]});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],visible:false}); 				
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"No Bukti", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,11,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.bTampil = new button(this,{bound:[740,11,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.bJurnal = new button(this,{bound:[840,11,80,18],caption:"Hitung",click:[this,"doHitung"]});
				
		this.pc1 = new pageControl(this,{bound:[20,20,900,450], childPage:["Data Dokter","Detail Norma THP"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:0,
				colTitle:["Kode","Nama","Keterangan","Band","Kode PP","Volume","Status"],
				colWidth:[[6,5,4,3,2,1,0],[80,80,80,80,150,200,70]],readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll, grid:this.sg});
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.childPage[1].width-5,this.pc1.childPage[1].height-35],colCount:10,tag:0,				
				colTitle:["Kode","Nama","Kode Norma","Nama Norma","Kode Akun","Kode PP","Kode DRK","Periode","Nilai","Status"],
				colWidth:[[9,8,7,6,5,4,3,2,1,0],[60,100,80,80,80,80,150,70,200,70]],
				colFormat:[[8],[cfNilai]],
				readOnly:true, defaultRow:1
		});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.childPage[1].height-25,this.pc1.childPage[1].width-1,25],buttonStyle:bsAll, grid:this.sg1, pager:[this,"doPager"]});				
		
		this.rearrangeChild(10, 23);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();					
			
			var tahun = parseFloat(this.dp_d1.year) + 1;
			this.e_tahun.setText(tahun);		
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_anggaran_fGajiTpkk.extend(window.childForm);
window.app_saku2_transaksi_anggaran_fGajiTpkk.implement({
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
			if (this.prog != "0") {
				system.alert(this,"Transaksi tidak valid.","Transaksi SDM telah di Close.");
				return false;
			}
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_tpkk_m','no_tpkk',this.app._lokasi+"-TPKK"+this.e_tahun.getText()+".",'000'));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from agg_tpkk_m where kode_lokasi='"+this.app._lokasi+"' and tahun= '"+this.e_tahun.getText()+"'");
					sql.add("delete from agg_tpkk_d where kode_lokasi='"+this.app._lokasi+"' and substring(periode,1,4)= '"+this.e_tahun.getText()+"'");
					sql.add("delete from agg_d where modul='BTPKK' and kode_lokasi='"+this.app._lokasi+"' and tahun= '"+this.e_tahun.getText()+"'");

					sql.add("insert into agg_tpkk_m(no_tpkk,kode_lokasi,tahun,tgl_input,nik_user) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_tahun.getText()+"',getdate(),'"+this.app._userLog+"')");
							
					
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];						
						switch(line.jns_periode.substr(0,1)){
							case "A":
								for (var b=1; b <= 12; b+=3) 
									sql.add("insert into agg_tpkk_d(kode_dokter,kode_param,periode,status,kode_pp,nilai,no_tpkk,kode_lokasi,kode_akun,kode_drk)"+
										    "values('"+line.kode_dokter+"','"+line.kode_param+"','"+this.e_tahun.getText()+( b < 10 ? "0":"")+b+"','"+line.status+"','"+line.kode_pp+"',"+line.nilai+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_akun+"','"+line.kode_drk+"')");							
							break;
							case "B":
								for (var b=1; b <= 12; b+=6) 
									sql.add("insert into agg_tpkk_d(kode_dokter,kode_param,periode,status,kode_pp,nilai,no_tpkk,kode_lokasi,kode_akun,kode_drk)"+
										    "values('"+line.kode_dokter+"','"+line.kode_param+"','"+this.e_tahun.getText()+( b < 10 ? "0":"")+b+"','"+line.status+"','"+line.kode_pp+"',"+line.nilai+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_akun+"','"+line.kode_drk+"')");							
							break;
							case "C":
								for (var b=1; b <= 12; b++) 
									sql.add("insert into agg_tpkk_d(kode_dokter,kode_param,periode,status,kode_pp,nilai,no_tpkk,kode_lokasi,kode_akun,kode_drk)"+
										    "values('"+line.kode_dokter+"','"+line.kode_param+"','"+this.e_tahun.getText()+( b < 10 ? "0":"")+b+"','"+line.status+"','"+line.kode_pp+"',"+line.nilai+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_akun+"','"+line.kode_drk+"')");							
							break;
							default :
								sql.add("insert into agg_tpkk_d(kode_dokter,kode_param,periode,status,kode_pp,nilai,no_tpkk,kode_lokasi,kode_akun,kode_drk)"+
										"values('"+line.kode_dokter+"','"+line.kode_param+"','"+this.e_tahun.getText()+line.jns_periode+"','"+line.status+"','"+line.kode_pp+"',"+line.nilai+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_akun+"','"+line.kode_drk+"')");
							break;
						}						
					}
					sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) "+
							"select a.kode_lokasi,'-',a.kode_drk,'-',a.kode_akun,a.kode_pp,a.periode,substring(a.periode,5,2),1,1,sum(a.nilai),'"+this.e_tahun.getText()+"','"+this.e_nb.getText()+"','BTPKK','0',a.status,c.nama "+
							"from agg_tpkk_d a inner join agg_tpkk_m b on a.no_tpkk=b.no_tpkk and a.kode_lokasi=b.kode_lokasi "+
							"                  inner join agg_drk c on a.kode_drk=c.kode_drk and c.tahun=substring(a.periode,1,4) "+
							"where a.periode like '"+this.e_tahun.getText()+"%' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_tpkk='"+this.e_nb.getText()+"' "+
							"group by a.kode_lokasi,a.kode_drk,a.kode_akun,a.kode_pp,a.periode,c.nama,a.status");

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
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); this.sg1.clear(1);  
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
					if (this.prog != "0") {
						system.alert(this,"Transaksi tidak valid.","Transaksi Honor TPKK telah di Close.");
						return false;
					}
					else this.simpan();
				break;							
		}	
	},	
	doChange:function(sender){
		if (sender == this.e_tahun && this.e_tahun.getText()!="") {
			var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'SDM' and tahun = '"+this.e_tahun.getText()+"'",true);
			if (typeof data == "object"){
				this.prog = data.rs.rows[0].progress;
			}			
		}
	},
	doLoad:function(sender){
		if (this.e_tahun.getText() != "") {			
			var data = this.dbLib.getDataProvider("select kode_dokter,nama,keterangan,kode_band,kode_pp,volume,status "+
			           "from agg_dokter where tahun='"+this.e_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_dokter,line.nama,line.keterangan,line.kode_band,line.kode_pp,line.volume,line.status]);
				}
			} else this.sg.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_tpkk_m','no_tpkk',this.app._lokasi+"-TPKK"+this.e_tahun.getText()+".",'000'));			
		}
	},
	doHitung: function(sender, col , row) {		
		var strSQL = "select a.kode_dokter,a.nama,c.kode_param,c.nama as nama_param,c.kode_akun,c.jns_periode,a.kode_pp,b.nilai,a.status,c.kode_drk "+
					 "from agg_dokter a inner join agg_norma_fix b on a.kode_band=b.kode_band and a.tahun=b.tahun "+
					 "                  inner join agg_param c on b.kode_param=c.kode_param and a.tahun=b.tahun "+
					 "where c.jenis = 'TPKK' and a.kode_lokasi='"+this.app._lokasi+"' and a.tahun='"+this.e_tahun.getText()+"' order by a.kode_dokter,c.kode_param";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[1]);
	},	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg1.appendData([line.kode_dokter,line.nama,line.kode_param,line.nama_param,line.kode_akun,line.kode_pp,line.kode_drk,line.jns_periode,floatToNilai(line.nilai),line.status]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
							this.clearLayar();						
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg1.clear(1);  
			setTipeButton(tbSimpan);
		} catch(e) {
			alert(e);
		}
	}
});