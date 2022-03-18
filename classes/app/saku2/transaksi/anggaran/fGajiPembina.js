window.app_saku2_transaksi_anggaran_fGajiPembina = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_anggaran_fGajiPembina.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_anggaran_fGajiPembina";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Honor Pembina: Input", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_tahun = new portalui_saiLabelEdit(this,{bound:[20,10,150,20],caption:"Tahun Anggaran",tag:2,maxLength:4,tipeText:ttAngka,change:[this,"doChange"]});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],visible:false}); 				
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti", readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.cb_pp = new saiCBBL(this,{bound:[20,11,200,20],caption:"PP", multiSelection:false, maxLength:10, tag:2});				
		this.bTampil = new button(this,{bound:[740,11,80,18],caption:"Tampil Data",click:[this,"doLoad"]});			
		this.bJurnal = new button(this,{bound:[840,11,80,18],caption:"Hitung",click:[this,"doHitung"]});
				
		this.pc1 = new pageControl(this,{bound:[20,20,900,450], childPage:["Data Pembina","Detail Honor"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:0,
				colTitle:["NIK","Nama","Jabatan","Band","Status"],
				colWidth:[[4,3,2,1,0],[80,80,150,200,80]],readOnly:true, defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll, grid:this.sg});
		
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.childPage[1].width-5,this.pc1.childPage[1].height-35],colCount:9,tag:0,				
				colTitle:["Kode","Nama","Kode Norma","Nama Norma","Kode Akun","Kode DRK","Periode","Nilai","Status"],
				colWidth:[[8,7,6,5,4,3,2,1,0],[60,100,80,80,80,150,70,200,70]],
				colFormat:[[7],[cfNilai]],
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
			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_bidang='3' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_anggaran_fGajiPembina.extend(window.childForm);
window.app_saku2_transaksi_anggaran_fGajiPembina.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_pembina_m','no_pembina',this.app._lokasi+"-PMBN"+this.e_tahun.getText()+".",'000'));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("delete from agg_pembina_m where kode_lokasi='"+this.app._lokasi+"' and tahun= '"+this.e_tahun.getText()+"'");
					sql.add("delete from agg_pembina_d where kode_lokasi='"+this.app._lokasi+"' and substring(periode,1,4)= '"+this.e_tahun.getText()+"'");
					sql.add("delete from agg_d where modul='BPMBN' and kode_lokasi='"+this.app._lokasi+"' and tahun= '"+this.e_tahun.getText()+"'");

					sql.add("insert into agg_pembina_m(no_pembina,kode_lokasi,tahun,kode_pp,tgl_input,nik_user) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_tahun.getText()+"','"+this.cb_pp.getText()+"',getdate(),'"+this.app._userLog+"')");
							
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];						
						switch(line.jns_periode.substr(0,1)){
							case "A":
								for (var b=1; b <= 12; b+=3) 
									sql.add("insert into agg_pembina_d(nik,kode_param,periode,status,kode_drk,nilai,no_pembina,kode_lokasi,kode_akun)"+
										    "values('"+line.nik+"','"+line.kode_param+"','"+this.e_tahun.getText()+( b < 10 ? "0":"")+b+"','"+line.status+"','"+line.kode_drk+"',"+line.nilai+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_akun+"')");							
							break;
							case "B":
								for (var b=1; b <= 12; b+=6) 
									sql.add("insert into agg_pembina_d(nik,kode_param,periode,status,kode_drk,nilai,no_pembina,kode_lokasi,kode_akun)"+
										    "values('"+line.nik+"','"+line.kode_param+"','"+this.e_tahun.getText()+( b < 10 ? "0":"")+b+"','"+line.status+"','"+line.kode_drk+"',"+line.nilai+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_akun+"')");							
							break;
							case "C":
								for (var b=1; b <= 12; b++) 
									sql.add("insert into agg_pembina_d(nik,kode_param,periode,status,kode_drk,nilai,no_pembina,kode_lokasi,kode_akun)"+
										    "values('"+line.nik+"','"+line.kode_param+"','"+this.e_tahun.getText()+( b < 10 ? "0":"")+b+"','"+line.status+"','"+line.kode_drk+"',"+line.nilai+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_akun+"')");							
							break;
							default :
								sql.add("insert into agg_pembina_d(nik,kode_param,periode,status,kode_drk,nilai,no_pembina,kode_lokasi,kode_akun)"+
										"values('"+line.nik+"','"+line.kode_param+"','"+this.e_tahun.getText()+line.jns_periode+"','"+line.status+"','"+line.kode_drk+"',"+line.nilai+",'"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+line.kode_akun+"')");
							break;
						}						
					}
					sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) "+
							"select a.kode_lokasi,'-',a.kode_drk,'-',a.kode_akun,b.kode_pp,a.periode,substring(a.periode,5,2),1,1,sum(a.nilai),'"+this.e_tahun.getText()+"','"+this.e_nb.getText()+"','BPMBN','0',a.status,c.nama "+
							"from agg_pembina_d a inner join agg_pembina_m b on a.no_pembina=b.no_pembina and a.kode_lokasi=b.kode_lokasi "+
							"                     inner join agg_drk c on a.kode_drk=c.kode_drk and c.tahun=substring(a.periode,1,4) "+
							"where a.periode like '"+this.e_tahun.getText()+"%' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_pembina='"+this.e_nb.getText()+"' "+
							"group by a.kode_lokasi,a.kode_drk,a.kode_akun,b.kode_pp,a.periode,c.nama,a.status");

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
						system.alert(this,"Transaksi tidak valid.","Transaksi Honor Pembina telah di Close.");
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
			var data = this.dbLib.getDataProvider("select nik,nama,jabatan,kode_band,status "+
			           "from agg_pembina where tahun='"+this.e_tahun.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.nik,line.nama,line.jabatan,line.kode_band,line.status]);
				}
			} else this.sg.clear(1);			
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_pembina_m','no_pembina',this.app._lokasi+"-PMBN"+this.e_tahun.getText()+".",'000'));
			this.cb_pp.setFocus();
		}
	},
	doHitung: function(sender, col , row) {		
		var strSQL = "select a.nik,a.nama,c.kode_param,c.nama as nama_param,c.kode_akun,c.jns_periode,c.kode_drk,b.nilai,a.status "+
					 "from agg_pembina a inner join agg_norma_fix b on a.kode_band=b.kode_band "+
					 "                   inner join agg_param c on b.kode_param=c.kode_param and c.tahun=b.tahun and c.tahun='"+this.e_tahun.getText()+"' "+
					 "where c.jenis = 'PMBN' and a.kode_lokasi='"+this.app._lokasi+"' and a.tahun='"+this.e_tahun.getText()+"'  order by a.nik,c.kode_param";
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
			this.sg1.appendData([line.nik,line.nama,line.kode_param,line.nama_param,line.kode_akun,line.kode_drk,line.jns_periode,floatToNilai(line.nilai),line.status]);
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